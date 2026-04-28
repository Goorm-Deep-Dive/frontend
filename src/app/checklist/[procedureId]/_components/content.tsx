"use client";

import { useGetProcedureDetailSuspense } from "@/apis/generated/api-client";
import DocumentListItem from "./document-list-item";
import BottomCTA from "@/components/common/bottom-cta";
import { Button } from "@/components/ui/button";
interface Props {
  procedureId: number;
}

export default function Content({ procedureId }: Props) {
  const { data: procedureDetail } = useGetProcedureDetailSuspense(procedureId);

  const cautionTextList = procedureDetail?.cautionText?.split(";") ?? [];

  return (
    <>
      <div className="gap flex flex-col gap-5 p-5">
        <div className="flex gap-5">
          <div>D-100</div>
          <div>
            <span>{procedureDetail?.dueDateDescription}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-gray-300 p-5">
          {/* 처리방법 */}
          <div className="flex flex-col gap-1">
            <span className="h4 text-gray-900">처리 방법</span>
            <ul className="body list-inside list-disc">
              {procedureDetail?.channels?.map((channel) => (
                <li key={channel.procedureChannelId}>
                  {channel.channelType} {channel.description}
                </li>
              ))}
            </ul>
          </div>

          {/* 처리(신고)처 */}
          <div className="flex flex-col gap-1">
            <span className="h4 text-gray-900">처리(신고)처</span>
            <ul className="body list-inside list-disc">
              {procedureDetail?.contacts?.map((contact) => (
                <li key={contact.procedureContactId}>
                  {contact.title} {contact.description}
                </li>
              ))}
            </ul>
          </div>

          {/* 지도검색 기준 */}
          <div className="flex flex-col gap-1">
            <span className="h4 text-gray-900">지도검색 기준</span>
            <ul className="body list-inside list-disc">
              <li>{procedureDetail?.searchScope}</li>
            </ul>
          </div>

          {/* 유의/주의사항 */}
          <div className="flex flex-col gap-1">
            <span className="h4 text-gray-900">유의/주의사항</span>
            <ul className="body list-inside list-disc">
              {cautionTextList.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="gap flex flex-col gap-5 p-5">
        <span className="h4 pl-5 text-gray-900">필요서류</span>
        <div className="flex flex-col gap-2.5">
          {procedureDetail?.documents?.map((document, index) => (
            <DocumentListItem
              index={index}
              key={document.userDocumentChecklistId}
              title={document.documentName ?? ""}
              checked={document.isChecked}
            />
          ))}
        </div>
      </div>

      <BottomCTA>
        <Button>{procedureDetail?.procedureName} 체크 완료하기</Button>
      </BottomCTA>
    </>
  );
}
