import { User } from "src/schemas";

export class CreateUserResultDto {
  status: number;
  data?: User;
  error?: string;
}
