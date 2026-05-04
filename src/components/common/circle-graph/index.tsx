"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

interface Item {
  value: number;
  label: string;
  color: string;
}

interface Props {
  items: Item[];
}

export default function CircleGraph({ items }: Props) {
  const INNER_TEXT_SIZE = 70;
  const BAR_SIZE = 6;
  const BAR_GAP = 4;
  const safeItems = items.slice(0, 5);
  const ringCount = safeItems.length;
  const innerRadius = INNER_TEXT_SIZE / 2;
  const ringThickness =
    ringCount > 0 ? ringCount * BAR_SIZE + (ringCount - 1) * BAR_GAP : 0;
  const outerRadius = innerRadius + ringThickness;
  const CHART_PADDING = 4;
  const chartSize = outerRadius * 2 + CHART_PADDING * 2;
  const total = safeItems.reduce((acc, item) => acc + item.value, 0);
  const averagePercent =
    safeItems.length > 0 ? Math.round(total / safeItems.length) : 0;
  const chartConfig = safeItems.reduce<ChartConfig>((acc, item) => {
    acc[item.label] = {
      label: item.label,
      color: item.color,
    };
    return acc;
  }, {});

  return (
    <div
      className="relative aspect-square"
      style={{ width: `${chartSize}px` }}
      role="img"
      aria-label={`전체 진행률 ${averagePercent}%`}
    >
      <ChartContainer
        config={chartConfig}
        className="aspect-square"
        style={{ width: `${chartSize}px` }}
        aria-hidden="true"
      >
        {safeItems.map((item, index) => {
          const ringInnerRadius = innerRadius + index * (BAR_SIZE + BAR_GAP);
          const ringOuterRadius = ringInnerRadius + BAR_SIZE;
          const innerShadowFilterId = `ring-inner-shadow-${index}`;

          return (
            <RadialBarChart
              key={`${item.label}-${index}`}
              data={[{ value: Math.max(0, Math.min(item.value, 100)) }]}
              width={chartSize}
              height={chartSize}
              innerRadius={ringInnerRadius}
              outerRadius={ringOuterRadius}
              startAngle={90}
              endAngle={-270}
              barSize={BAR_SIZE}
              style={{ position: "absolute", inset: 0 }}
            >
              <defs>
                <filter
                  id={innerShadowFilterId}
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feOffset dx="0" dy="1" />
                  <feGaussianBlur stdDeviation="1" result="offset-blur" />
                  <feComposite
                    operator="arithmetic"
                    in="offset-blur"
                    in2="SourceAlpha"
                    k2="-1"
                    k3="1"
                    result="inner-shadow"
                  />
                  <feColorMatrix
                    in="inner-shadow"
                    type="matrix"
                    values="
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0.25 0
                    "
                    result="shadow-color"
                  />
                  <feComposite
                    in="shadow-color"
                    in2="SourceGraphic"
                    operator="over"
                  />
                </filter>
              </defs>
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar
                dataKey="value"
                fill={item.color}
                background={{
                  fill: "var(--color-primary-bg)",
                  filter: `url(#${innerShadowFilterId})`,
                }}
                cornerRadius={999}
              />
            </RadialBarChart>
          );
        })}
      </ChartContainer>

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: `${INNER_TEXT_SIZE}px`,
            height: `${INNER_TEXT_SIZE}px`,
          }}
        >
          <span className="h2 leading-none font-bold text-gray-900">
            {averagePercent}%
          </span>
        </div>
      </div>
    </div>
  );
}
