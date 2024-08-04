export const initState = {
  location: {
    country: {
      name: '',
      label: '',
    },
    city: '',
  },
  supportPhone: '',
  dialCode: '',
  liveChat: {
    roomId: '',
    admin: {
      name: '',
      id: '',
    },
    messages: [],
  },
  mail: {
    emailSending: false,
    compose: false,
    address: '',
  },
  isMessanger: false,
  alerm: {
    sent: 0,
    received: 0,
  },
};
export const onSupportChatOpened = (state, { message }) => ({
  ...state,
  liveChat: {
    messages: [
      {
        client: false,
        message,
        date: new Date().toISOString(),
      },
    ],
  },
});
export const onFetchSiteInfo = (
  state,
  {
    data: {
      location: { country, city },
      support,
      dial_code,
    },
  }
) => ({
  ...state,
  location: {
    country,
    city,
  },
  supportPhone: support,
  dialCode: dial_code,
  
});
