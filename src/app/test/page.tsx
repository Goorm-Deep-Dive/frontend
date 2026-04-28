"use client";
import { Button } from "@/components/ui/button";

export default function TestPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div>
          <Button>입력하기</Button>
          <Button disabled>입력하기</Button>
        </div>
        <div>
          <Button>다음으로</Button>
          <Button disabled>다음으로</Button>
        </div>
        <div>
          <Button>화장/매장신고 체크 완료하기</Button>
          <Button disabled>화장/매장신고 체크 완료하기</Button>
        </div>
        <div>
          <Button>Logout</Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <Button size="small">로그안하기</Button>
        </div>
        <div>
          <Button size="small">전체 요약하기</Button>
        </div>
        <div>
          <Button size="small">임시 저장하기</Button>
          <Button size="small" disabled>
            임시 저장하기
          </Button>
        </div>
        <div>
          <Button size="small">다음 질문으로</Button>
          <Button size="small" disabled>
            다음 질문으로
          </Button>
        </div>
        <div>
          <Button size="small">이전 질문으로</Button>
          <Button disabled>이전 질문으로</Button>
        </div>
      </div>
    </div>
  );
}
