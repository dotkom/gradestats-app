import { getReportListApiUrl } from '../urls';

export const requestCreateReport = async ({ description, course, contactEmail }) => {
  const data = {
    description,
    course,
    contact_email: contactEmail,
  };
  const response = await fetch(getReportListApiUrl(), {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const responseData = await response.json();

  if (response.status === 400) {
    const messages = [];
    Object.values(responseData).forEach((message) => {
      if (Array.isArray(message)) {
        messages.push(...message);
      } else {
        messages.push(message);
      }
    });
    return {
      status: 400,
      messages,
    };
  }
  if (response.status === 201) {
    return {
      status: 201,
      data: responseData,
    };
  }
};
