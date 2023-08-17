/**
 * client events
 * CREATE_ROOM - 셀럽회원에 의한 채팅방 생성
 * JOIN_ROOM - 셀럽회원 및 일반회원 채팅방 입장
 * SEND_CELB_MESSAGE - 셀럽회원 메세지 전송
 * SEND_FAN_MESSAGE - 일반회원 메세지 전송
 *
 * server events
 * JOINED_ROOM - 셀럽회원 및 일반회원 채팅방 입장
 * RECIEVED_CELB_MESSAGE - 셀럽회원 메세지 수신
 * RECIEVED_FAN_MESSAGE - 일반회원 메세지 수신
 */

export interface ServerToClientEvents {
  JOINED_ROOM: (data: ChatData) => void;
  RECIEVED_CELB_MESSAGE: (data: ChatData) => void;
  RECIEVED_FAN_MESSAGE: (data: ChatData) => void;
}

export interface ClientToServerEvents {
  CREATE_ROOM: (data: ChatData) => void;
  JOIN_ROOM: (data: ChatData) => void;
  SEND_CELB_MESSAGE: (data: ChatData) => void;
  SEND_FAN_MESSAGE: (data: ChatData) => void;
}

export interface InterServerEvents {}

export interface ChatData {
  event: string;
  username: string;
  message: string;
}
