export class GenericResponse<T> {
    code!: number;
    data!: T;
    errors!: string[];
    message!: string;


  }