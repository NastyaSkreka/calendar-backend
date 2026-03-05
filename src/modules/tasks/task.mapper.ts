import { Task } from "prisma/generated/client";
import { TaskResponseDto } from "./dto/responses/task.response.dto";

export class TaskMapper {

  static toResponse(task: Task): TaskResponseDto {
    return {
      id: task.id,
      title: task.title,
      day: task.day,
      order: task.order,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    }

  }

}