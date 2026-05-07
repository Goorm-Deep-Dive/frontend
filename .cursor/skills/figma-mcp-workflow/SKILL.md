---
name: figma-mcp-workflow
description: Figma 링크 기반으로 디자인 컨텍스트를 가져와 Next.js + TypeScript + Tailwind 코드로 구현하는 워크플로우
---

# Figma MCP Workflow

이 스킬은 `accompany` 프로젝트에서 Figma MCP를 활용해 디자인을 코드로 반영할 때 사용하는 기본 절차다.

## Goal
- Figma 선택 노드의 구조/스타일을 안정적으로 추출한다.
- 기존 컴포넌트/토큰을 우선 재사용해 유지보수성을 높인다.
- 불필요한 아이콘 패키지 추가 없이 Figma asset을 그대로 반영한다.

## Required Flow
1. Figma 프레임 또는 레이어 링크를 받는다.
2. `get_design_context`로 구조/스타일을 먼저 수집한다.
3. 필요 시 `get_variable_defs`로 색상/타이포/간격 토큰을 추가 확인한다.
4. 시각 검증이 필요하면 `get_screenshot`을 호출한다.
5. 프로젝트 규칙에 맞게 Next.js App Router + TypeScript 코드로 반영한다.

## Implementation Rules
- Server Component 우선 원칙을 지키고, Client Component는 leaf에서만 사용한다.
- 기존 레이어 구조(`components`, `hooks`, `stores`, `api`)를 유지한다.
- `any`를 사용하지 않고 타입을 명시한다.
- 하드코딩 대신 기존 디자인 토큰/상수를 우선 사용한다.
- Figma에서 제공한 이미지/SVG asset URL이 있으면 이를 그대로 사용한다.

## Prompt Templates
- "이 Figma 링크를 기준으로 `get_design_context`와 `get_screenshot`을 사용해서 `src/app/...`에 맞게 구현해줘."
- "해당 선택 영역에서 `get_variable_defs`를 먼저 확인하고, 기존 토큰으로 치환 가능한 값은 치환해줘."
- "기존 컴포넌트를 우선 재사용하고, 새 컴포넌트가 필요하면 최소 단위로 분리해서 추가해줘."
