export const getChannelLabel = (channelType: string) => {
  switch (channelType) {
    case "VISIT":
      return "온라인";
    case "POSTAL":
      return "오프라인";
    default:
      return channelType;
  }
};
