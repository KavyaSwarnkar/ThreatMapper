import { G6Edge, G6Graph, G6Item, G6Node } from '@/features/topology/types/graph';
import { pointAround } from '@/features/topology/utils/gForce';

export const expandNode = (item: G6Item) => {
  itemSetExpanding(item);
};

export const finishExpandingNode = (graph: G6Graph, item: G6Item) => {
  if (itemExpandsAsCombo(item)) {
    return finishExpandCombo(graph, item);
  }

  return finishExpandSimpleNode(graph, item);
};

const finishExpandSimpleNode = (graph: G6Graph, item: G6Item) => {
  itemSetExpanded(item);
  graph.emit('df-track-item', { item });
};

const finishExpandCombo = (graph: G6Graph, item: G6Item) => {
  const model = item.get('model');
  const node_id = model.id;
  const combo_id = `${node_id}-combo`;

  model.children_ids = new Set([combo_id]);
  graph.createCombo(
    {
      id: combo_id,
      parent_id: node_id,
      node_type: 'combo',
      center_ids: [],
      children_ids: new Set(),
      x: pointAround(model.x, 50),
      y: pointAround(model.y, 50),
      style: {
        stroke: model.cloudInfo?.edgeStyle?.stroke,
      },
    },
    [],
  );

  const combo = graph.findById(combo_id);
  const combo_model = combo.get('model');

  const center_id = `${combo_id}-center`;
  // This node will be an invisible node that lie at the center of combo layout nodes which
  // helps to pull all other nodes at its center
  graph.addItem('node', {
    id: center_id,
    node_type: 'combo_center',
    parent_id: combo_id,
    comboId: combo_id,
    size: 1,
    style: {
      opacity: 0,
    },
    x: combo_model.x,
    y: combo_model.y,
  });
  combo_model.center_ids.push(center_id);

  // this is the edge between the parent node and the combo. The gForce layout
  // skips this during layout
  graph.addItem('edge', {
    ...pseudoEdge(node_id, combo_id),
    combo_pseudo: true,
    style: { ...model.cloudInfo?.edgeStyle, endArrow: false },
  });

  // this is an extra invisible edge between the parent node and the center of
  // the combo. Since the combo edge above is skipped, we create this one to
  // keep the combo close to its parent. See the edgeStrength code handling
  // combo_pseudo.
  // I see without this edge, combos are overlaped
  graph.addItem('edge', {
    ...pseudoEdge(node_id, center_id),
    combo_pseudo_center: true,
    style: {
      lineWidth: 0,
      endArrow: false,
    },
  });

  itemSetExpanded(combo);
  itemSetExpanded(item);

  graph.emit('df-track-item', { item: combo });
};

// this is the static things that will consider a node as combo or not
export const itemExpandsAsCombo = (item: G6Item | null) => {
  const model = item?.get('model');
  return (
    model.node_type === 'kubernetes_cluster' ||
    model.node_type === 'host' ||
    model.node_type === 'pod' ||
    model.node_type == 'container'
  );
};

// nodes that can expand
export const itemExpands = (item: G6Item) => {
  const model = item.get('model');

  switch (model.node_type) {
    case 'cloud':
    case 'region':
    case 'kubernetes_cluster':
    case 'host':
    case 'pod':
    case 'container':
      return true;
  }

  return false;
};
// TODO: seems pseudoEdge will be the edges after user expand a node
export const pseudoEdge = (source: string, target: string) => ({
  source,
  target,
  pseudo: true,
});

export const removeNodeItem = (graph: G6Graph, item: G6Node) => {
  for (const edge of item.getEdges()) {
    const edgeModel = edge.get('model');
    if (edgeModel.connection) {
      graph.removeItem(edgeModel.id);
    }
  }

  graph.removeItem(item);
};

const ExpandState = {
  EXPANDING: 'EXPANDING',
  EXPANDED: 'EXPANDED',
};

const itemSetExpanding = (item: G6Item) => {
  const model = item.get('model');
  model.expand_state = ExpandState.EXPANDING;
};

const itemSetExpanded = (item: G6Item) => {
  const model = item.get('model');
  model.expand_state = ExpandState.EXPANDED;
};

const itemUnsetExpanded = (item: G6Item) => {
  const model = item.get('model');
  delete model.expand_state;
};

export const isItemExpanding = (item: G6Item) => {
  return item.get('model').expand_state === ExpandState.EXPANDING;
};

export const isItemExpanded = (item: G6Item) => {
  return item.get('model').expand_state !== undefined;
};

export const collapseNode = (
  graph: G6Graph,
  item: G6Node,
  onNodeCollapsed?: (item: G6Item) => void,
  isChild?: boolean,
) => {
  if (itemExpandsAsCombo(item)) {
    return collapseCombo(graph, item, onNodeCollapsed, isChild);
  }
  return collapseSimpleNode(graph, item, onNodeCollapsed, isChild);
};

// TODO: collapseSimpleNode is called when removing simple nodes
// however it is a confusion code between removeNodesSimple of utils
// it may need to merge this two function
const collapseSimpleNode = (
  graph: G6Graph,
  item: G6Node,
  onNodeCollapsed?: (item: G6Item) => void,
  isChild?: boolean,
) => {
  const model = item.get('model');

  for (const edge of item.getOutEdges() as G6Edge[]) {
    // TODO: seems this id is always undefined
    graph.removeItem((edge as any).id);
  }

  if (model.children_ids) {
    for (const child_id of model.children_ids) {
      const child = graph.findById(child_id) as G6Node; // simple custom node

      if (isItemExpanded(child)) {
        collapseNode(graph, child, onNodeCollapsed, true);
      }
      removeNodeItem(graph, child);
    }

    // clearing children_ids set after nodes and combo nodes have been deleted
    model.children_ids.clear();
  }

  itemUnsetExpanded(item);

  if (onNodeCollapsed) {
    onNodeCollapsed(item);
  }
};
// collapse combo continuously check of children node and collapse all of them
const collapseCombo = (
  graph: G6Graph,
  item: G6Node,
  onNodeCollapsed?: (item: G6Item) => void,
  isChild?: boolean,
) => {
  const model = item.get('model');

  if (!isItemExpanding(item)) {
    const combo_id = model.children_ids.values().next().value;
    const combo = graph.findById(combo_id);
    const combo_model = combo.get('model');
    if (combo_model.children_ids) {
      for (const child_id of combo_model.children_ids) {
        // remove a child node from children_ids set
        combo_model.children_ids.delete(child_id);
        const child = graph.findById(child_id) as G6Node;
        if (isItemExpanded(child)) {
          collapseNode(graph, child, onNodeCollapsed, true);
        }
        removeNodeItem(graph, child);
      }
    }
    itemUnsetExpanded(combo);
  }
  itemUnsetExpanded(item);

  collapseSimpleNode(graph, item, onNodeCollapsed, isChild);
};
