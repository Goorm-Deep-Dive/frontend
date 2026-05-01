export const getChannelLabel = (channelType?: string) => {
  switch (channelType) {
    case "ONLINE":
      return "온라인";
    case "VISIT":
      return "방문";
    case "POSTAL":
      return "우편";
    case "PHONE":
      return "전화";
    case "FAX":
      return "팩스";
    default:
      return channelType;
  }
};
