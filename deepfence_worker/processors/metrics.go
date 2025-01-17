package processors

import (
	"context"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
	"github.com/twmb/franz-go/pkg/kadm"
	"github.com/twmb/franz-go/pkg/kgo"

	"github.com/deepfence/ThreatMapper/deepfence_utils/log"
)

var (
	commitNeo4jRecordsCounts = promauto.NewCounterVec(prometheus.CounterOpts{
		Name: "neo4j_commit_records_total",
		Help: "Total number of records committed to neo4j",
	}, []string{"worker", "status"})
	topicLag = promauto.NewGaugeVec(prometheus.GaugeOpts{
		Name: "consumer_group_lag",
		Help: "Consumer group lag per topic",
	}, []string{"topic"})
)

func StartGetLagByTopic(ctx context.Context, kafkaBrokers []string, groupID string, kgoLogger kgo.Logger) error {
	opts := []kgo.Opt{
		kgo.SeedBrokers(kafkaBrokers...),
		kgo.WithLogger(kgoLogger),
	}
	client, err := kgo.NewClient(opts...)
	if err != nil {
		return err
	}

	if err := client.Ping(ctx); err != nil {
		client.Close()
		return err
	}

	go func() {
		admin := kadm.NewClient(client)
		defer admin.Close()
		ticker := time.NewTicker(30 * time.Second)
		defer ticker.Stop()
	loop:
		for {
			select {
			case <-ctx.Done():
				log.Info().Msg("stop collecting consumer log")
				break loop
			case <-ticker.C:
				described, err := admin.DescribeGroups(ctx, groupID)
				if err != nil {
					log.Error().Msgf("%v", err)
					continue
				}
				fetched, err := admin.FetchOffsets(ctx, groupID)
				if err != nil {
					log.Error().Msgf("%v", err)
					continue
				}
				toList := described.AssignedPartitions()
				toList.Merge(fetched.Offsets().TopicsSet())
				endOffsets, err := admin.ListEndOffsets(ctx, toList.Topics()...)
				if err != nil {
					log.Error().Msgf("%v", err)
					continue
				}
				lagByTopic := kadm.CalculateGroupLag(described[groupID], fetched, endOffsets).TotalByTopic()
				for k, v := range lagByTopic {
					log.Debug().Msgf("consumer group lag topic=%s lag=%d", k, v.Lag)
					topicLag.WithLabelValues(k).Set(float64(v.Lag))
				}
			}
		}
		client.Close()
	}()
	return nil
}
