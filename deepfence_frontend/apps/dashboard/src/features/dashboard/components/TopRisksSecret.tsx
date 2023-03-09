import { IconContext } from 'react-icons';
import { HiOutlineChevronRight, HiShieldExclamation } from 'react-icons/hi';
import { Button, Card, Separator } from 'ui-components';

import { SEVERITY_COLORS } from '@/constants/charts';
import { TopRisksVulnerabilityChart } from '@/features/dashboard/components/TopRisksVulnerabilityChart';
import { Mode, useTheme } from '@/theme/ThemeContext';

const getData = (mode: Mode) => [
  {
    label: 'Total',
    count: 897,
    color: mode === 'dark' ? '#9CA3AF' : '#6B7280',
  },
  {
    label: 'Critical',
    count: 183,
    color: SEVERITY_COLORS['critical'],
  },
  {
    label: 'High',
    count: 371,
    color: SEVERITY_COLORS['high'],
  },
  {
    label: 'Medium',
    count: 290,
    color: SEVERITY_COLORS['medium'],
  },
  {
    label: 'Low',
    count: 53,
    color: SEVERITY_COLORS['low'],
  },
];
const MOST_VULNERABLES = [
  {
    label: 'k8s.gcr.io/echoserver:1.101',
    counts: {
      critical: 4,
      high: 6,
      low: 2,
    },
  },
  {
    label: 'k8s.gcr.io/echoserver:1.102',
    counts: {
      critical: 3,
      high: 0,
      low: 4,
    },
  },
  {
    label: 'k8s.gcr.io/echoserver:1.103',
    counts: {
      critical: 4,
      high: 8,
      low: 1,
    },
  },
  {
    label: 'k8s.gcr.io/echoserver:1.104',
    counts: {
      critical: 2,
      high: 1,
      low: 20,
    },
  },
  {
    label: 'k8s.gcr.io/echoserver:1.105',
    counts: {
      critical: 20,
      high: 20,
      low: 20,
    },
  },
];
export const TopRisksSecret = () => {
  const { mode } = useTheme();
  return (
    <Card className="p-2">
      <div className="flex flex-row items-center gap-x-2 pb-2">
        <IconContext.Provider
          value={{
            className: 'text-blue-700',
          }}
        >
          <HiShieldExclamation />
        </IconContext.Provider>
        <h4 className="text-base font-medium">Top Risks Secrets</h4>
        <div className="flex justify-end ml-auto">
          <Button color="normal" size="xs">
            View Details&nbsp;
            <HiOutlineChevronRight />
          </Button>
        </div>
      </div>
      <Separator />
      <div className="mt-4">
        <div className="h-full dark:text-white">
          <div className={`flex gap-4 justify-center my-4 divide-x dark:divide-gray-700`}>
            {getData(mode).map((data) => {
              return (
                <div
                  key={data.count}
                  className="text-[1.5rem] flex flex-col font-light pl-2 pr-4"
                >
                  <span className="text-[1.5rem]">{data.count}</span>
                  <span
                    className="text-xs"
                    style={{
                      color: data.color,
                    }}
                  >
                    {data.label}
                  </span>
                </div>
              );
            })}
          </div>
          {/* <Separator /> */}
          <h6 className={`ml-2 mt-8 mb-6 text-sm font-normal`}>
            Most Vulnerable Running Assets
          </h6>
          <div className="grid grid-cols-[1fr_2fr] mt-2 items-center gap-4">
            <div className="h-[160px] w-[160px]">
              <TopRisksVulnerabilityChart theme={mode} />
            </div>
            <div className="flex flex-col gap-y-2">
              {MOST_VULNERABLES.map((vulnerable) => {
                return (
                  <div key={vulnerable.label} className="flex gap-x-2">
                    <div className={`flex items-center gap-1 `}>
                      <div
                        className="h-2 w-2"
                        style={{
                          backgroundColor: SEVERITY_COLORS['critical'],
                        }}
                      ></div>
                      {vulnerable.counts.critical}
                    </div>
                    <div className={`flex items-center gap-1 font-semibold text-xs`}>
                      <div
                        className="h-2 w-2"
                        style={{
                          backgroundColor: SEVERITY_COLORS['high'],
                        }}
                      ></div>
                      {vulnerable.counts.high}
                    </div>
                    <div className={`flex items-center gap-1 font-semibold text-xs`}>
                      <div
                        className="h-2 w-2"
                        style={{
                          backgroundColor: SEVERITY_COLORS['low'],
                        }}
                      ></div>
                      <span>{vulnerable.counts.low}</span>
                    </div>
                    <span className={`text-xs`}>{vulnerable.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={`flex justify-center gap-4 mt-4 mb-4 text-xs`}>
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <div
                className="h-2 w-2"
                style={{
                  backgroundColor: SEVERITY_COLORS['critical'],
                }}
              ></div>
              <span>Critical</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <div
                className="h-2 w-2"
                style={{
                  backgroundColor: SEVERITY_COLORS['high'],
                }}
              ></div>
              <span>High</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <div
                className="h-2 w-2"
                style={{
                  backgroundColor: SEVERITY_COLORS['medium'],
                }}
              ></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <div
                className="h-2 w-2"
                style={{
                  backgroundColor: SEVERITY_COLORS['low'],
                }}
              ></div>
              <span>Low</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
