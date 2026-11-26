"use client";

import type { Block } from "@/data/types";
import { Reveal } from "@/components/common/Reveal";
import { Rich } from "@/lib/text";
import { Callout, Formula, ListBlock, NanaSays } from "./BlockParts";
import { ChainBlock } from "./ChainBlock";
import { ClashBlock } from "./ClashBlock";
import { CompareBlock } from "./CompareBlock";
import { ForcesBlock } from "./ForcesBlock";
import { LadderBlock } from "./LadderBlock";
import { MatrixBlock } from "./MatrixBlock";
import { QuadBlock } from "./QuadBlock";
import { SchoolMapBlock } from "./SchoolMapBlock";

/** 解説ページの部品を、種類ごとに描き分ける */
export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <Reveal>
          <p className="text-[15px] leading-[2] text-ink-800 sm:text-[16px]">
            <Rich text={block.text} />
          </p>
        </Reveal>
      );
    case "callout":
      return (
        <Reveal>
          <Callout tone={block.tone} title={block.title} text={block.text} />
        </Reveal>
      );
    case "compare":
      return <CompareBlock left={block.left} right={block.right} caption={block.caption} />;
    case "chain":
      return <ChainBlock title={block.title} nodes={block.nodes} caption={block.caption} />;
    case "map":
      return <SchoolMapBlock title={block.title} regions={block.regions} />;
    case "forces":
      return <ForcesBlock title={block.title} center={block.center} forces={block.forces} />;
    case "ladder":
      return <LadderBlock title={block.title} steps={block.steps} goal={block.goal} />;
    case "matrix":
      return <MatrixBlock title={block.title} columns={block.columns} rows={block.rows} />;
    case "quad":
      return <QuadBlock title={block.title} rows={block.rows} cols={block.cols} cells={block.cells} caption={block.caption} />;
    case "clash":
      return <ClashBlock title={block.title} items={block.items} />;
    case "nana":
      return (
        <Reveal>
          <NanaSays text={block.text} mood={block.mood} />
        </Reveal>
      );
    case "list":
      return (
        <Reveal>
          <ListBlock style={block.style} title={block.title} items={block.items} />
        </Reveal>
      );
    case "formula":
      return (
        <Reveal>
          <Formula parts={block.parts} ops={block.ops} caption={block.caption} />
        </Reveal>
      );
  }
}
