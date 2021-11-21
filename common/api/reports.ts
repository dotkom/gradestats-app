import { requestsWithAuth } from 'common/requests';

interface Data {
  description: string;
  course?: string;
  contactEmail?: string;
}

export const requestCreateReport = async ({ description, course, contactEmail }: Data) => {
  const data = {
    description,
    course,
    contact_email: contactEmail,
  };
  const response = await requestsWithAuth.post('https://m9z5uzxy1i.execute-api.eu-west-1.amazonaws.com/mail', data);
  return response;
};
