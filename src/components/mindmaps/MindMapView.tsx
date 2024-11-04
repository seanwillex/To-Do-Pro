'use client';

import * as React from 'react';
import { MindMap, MindMapNode, MindMapEdge } from '@/types';
import { Card, CardHeader, CardContent, Button } from "@/components/ui";
import { Plus, Minus } from 'lucide-react';

interface MindMapViewProps {
  mindMap: MindMap;
  updateMindMap: (id: number, updates: Partial<MindMap>) => void;
}

export function MindMapView({ mindMap, updateMindMap }: MindMapViewProps) {
  const [zoom, setZoom] = React.useState(1);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = React.useState<string | null>(null);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  const handleNodeDragStart = (nodeId: string, e: React.MouseEvent) => {
    setDragging(nodeId);
    setOffset({
      x: e.clientX - mindMap.nodes.find(n => n.id === nodeId)!.x,
      y: e.clientY - mindMap.nodes.find(n => n.id === nodeId)!.y,
    });
  };

  const handleNodeDrag = (e: React.MouseEvent) => {
    if (!dragging) return;

    const updatedNodes = mindMap.nodes.map(node =>
      node.id === dragging
        ? {
            ...node,
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
          }
        : node
    );

    updateMindMap(mindMap.id, { nodes: updatedNodes });
  };

  const handleNodeDragEnd = () => {
    setDragging(null);
  };

  const renderEdge = (edge: MindMapEdge) => {
    const source = mindMap.nodes.find(n => n.id === edge.source);
    const target = mindMap.nodes.find(n => n.id === edge.target);
    if (!source || !target) return null;

    return (
      <line
        key={`${edge.source}-${edge.target}`}
        x1={source.x}
        y1={source.y}
        x2={target.x}
        y2={target.y}
        stroke="currentColor"
        strokeWidth="2"
        className="opacity-50"
      />
    );
  };

  const renderNode = (node: MindMapNode) => {
    const nodeSize = node.type === 'root' ? 100 : node.type === 'branch' ? 80 : 60;

    return (
      <g
        key={node.id}
        transform={`translate(${node.x - nodeSize/2},${node.y - nodeSize/2})`}
        onMouseDown={(e) => handleNodeDragStart(node.id, e)}
        className="cursor-move"
      >
        <rect
          width={nodeSize}
          height={nodeSize}
          rx="8"
          className="fill-background stroke-border"
        />
        <text
          x={nodeSize/2}
          y={nodeSize/2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm font-medium"
        >
          {node.label}
        </text>
      </g>
    );
  };

  return (
    <Card className="h-[calc(100vh-16rem)]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setZoom(z => Math.min(z + 0.1, 2))}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Zoom: {Math.round(zoom * 100)}%
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-full overflow-hidden border rounded-md">
          <svg
            ref={svgRef}
            width="100%"
            height="100%"
            onMouseMove={handleNodeDrag}
            onMouseUp={handleNodeDragEnd}
            onMouseLeave={handleNodeDragEnd}
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center',
              transition: 'transform 0.2s',
            }}
          >
            <g>
              {mindMap.edges.map(renderEdge)}
              {mindMap.nodes.map(renderNode)}
            </g>
          </svg>
        </div>
      </CardContent>
    </Card>
  );
} 