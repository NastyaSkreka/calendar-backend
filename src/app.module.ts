import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true}), TasksModule],
  providers: [AppService],
})
export class AppModule {}
