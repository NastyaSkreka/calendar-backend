import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskRequestDto } from './dto/requests/create-task.request.dto';
import { ReorderTasksRequestDto } from './dto/requests/reorder-tasks.request.dto';
import { UpdateTaskRequestDto } from './dto/requests/update-task.request.dto';
import { TaskResponseDto } from './dto/responses/task.response.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async list(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('search') search?: string,
  ): Promise<TaskResponseDto[]> {
    return this.tasksService.list({
      from,
      to,
      search,
    });
  }

  @Post()
  async create(@Body() dto: CreateTaskRequestDto): Promise<TaskResponseDto> {
    return this.tasksService.create(dto);
  }

  @Patch('reorder')
  async reorder(
    @Body() dto: ReorderTasksRequestDto,
  ): Promise<{ success: boolean }> {
    return this.tasksService.reorder(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskRequestDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.tasksService.remove(id);
  }
}
