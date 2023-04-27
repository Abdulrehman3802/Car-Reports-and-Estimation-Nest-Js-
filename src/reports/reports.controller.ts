import {Body, Controller, Get, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {CreateReportsDto} from "./dtos/create-reports.dto";
import {ReportsService} from "./reports.service";
import {AuthGuard} from "../guard/auth.guard";
import {User} from "../users/entities/user.entity";
import {CurrentUser} from "../users/decorators/create-user.decorator";
import {Serialize} from "../interceptors/serialize.interceptors";
import {ReportsDto} from "./dtos/reports.dto";
import {ApprovedReportDto} from "./dtos/approved-report.dto";
import {AdminGuard} from "../guard/admin.guard";
import {GetEstimateDto} from "./dtos/get-estimate.dto";

@Controller('reports')
export class ReportsController {
  constructor(private reportService:ReportsService) {
  }
  @Get()
  getEstimate(@Query() query:GetEstimateDto){
    return this.reportService.createEstimate(query)
  }
    @Post()
    @Serialize(ReportsDto)
    createReport(@Body() body:CreateReportsDto ,@CurrentUser() user:User){
        return this.reportService.create(body,user)
    }
    @Patch("/:id")
    @UseGuards(AdminGuard)
    approvedReport(@Param('id') id:number,@Body() body:ApprovedReportDto){
      return this.reportService.changeApproval(id,body.approved)
    }
}
