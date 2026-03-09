import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infrastrusture/prisma/prisma.service';
import { CreateTaskRequestDto } from './dto/requests/create-task.request.dto';
import { ReorderTasksRequestDto } from './dto/requests/reorder-tasks.request.dto';
import { UpdateTaskRequestDto } from './dto/requests/update-task.request.dto';
import { TaskResponseDto } from './dto/responses/task.response.dto';
import { TaskMapper } from './task.mapper';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async list(params: {
    from?: string;
    to?: string;
    search?: string;
  }): Promise<TaskResponseDto[]> {
    const { from, to, search } = params;

    const tasks = await this.prisma.task.findMany({
      where: {
        day: from && to ? { gte: from, lte: to } : undefined,

        title: search ? { contains: search, mode: 'insensitive' } : undefined,
      },

      orderBy: [{ day: 'asc' }, { order: 'asc' }],
    });
    return tasks.map(TaskMapper.toResponse);
  }

  async create(dto: CreateTaskRequestDto): Promise<TaskResponseDto> {
    const lastTask = await this.prisma.task.findFirst({
      where: { day: dto.day },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const order = lastTask ? lastTask.order + 1 : 0;

    const task = await this.prisma.task.create({
      data: {
        title: dto.title,
        day: dto.day,
        order,
      },
    });

    return TaskMapper.toResponse(task);
  }

  async reorder(dto: ReorderTasksRequestDto): Promise<{ success: boolean }> {
    const { day, orderedIds } = dto;

    if (!orderedIds.length) return { success: true };

    await this.prisma.$transaction(
      orderedIds.map((id, index) =>
        this.prisma.task.update({
          where: { id },
          data: {
            order: index,
            day: day,
          },
        }),
      ),
    );

    return { success: true };
  }
  async update(
    id: string,
    dto: UpdateTaskRequestDto,
  ): Promise<TaskResponseDto> {
    const existing = await this.prisma.task.findUnique({ where: { id } });
    console.log(id);
    if (!existing) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    const task = await this.prisma.task.update({
      where: { id },
      data: dto,
    });

    return TaskMapper.toResponse(task);
  }

  async remove(id: string): Promise<{ success: boolean }> {
    await this.prisma.task.delete({
      where: { id },
    });

    return { success: true };
  }
}
