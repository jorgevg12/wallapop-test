import { MessageType } from "../enums/enums";
import { MessageScreen } from "../types/types";

export const MessageIconScreenValues: Record<MessageType, MessageScreen> = {
  [MessageType.NoResults]: {
    message: 'No Data Found',
    img: 'no-results',
  },
  [MessageType.Error]: {
    message: 'Ups! Something went wrong while fetching data...',
    img: 'error',
  },
  [MessageType.Loading]: {
    img: 'loading',
  },
};
