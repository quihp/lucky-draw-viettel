export const renderNamePrize = (prizeType) => {
  switch (prizeType) {
    case 0:
      return "Giải đặc biệt";
    case 1:
      return "Giải nhất";
    case 2:
      return "Giải nhì";
    case 3:
      return "Giải ba";
    default:
    case 4:
      return "Giải khuyến khích";
  }
};
