/* eslint-disable @typescript-eslint/no-unused-vars */
interface Todo {
  id: number;
  title: string;
  image: string;
  updatedAt: Date?;
}

namespace TODO {
  type getResponse = Todo[];
  type getRequest = void;

  type postResponse = Todo;
  type postRequest = {
    title: string;
    image: string;
  };

  type editResponse = Todo;
  type editRequest = {
    id: number;
    title: string;
    image: string;
    updateDate: Date;
  };

  type deleteResponse = void;
  type deleteRequest = {
    id: number;
  };
}
