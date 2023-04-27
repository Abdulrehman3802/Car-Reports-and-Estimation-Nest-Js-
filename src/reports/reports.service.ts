import {Injectable, NotFoundException, Param} from '@nestjs/common';
import {CreateReportsDto} from "./dtos/create-reports.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Report} from "./reprts.entity";
import {Repository} from "typeorm";
import {User} from "../users/entities/user.entity";
import {ApprovedReportDto} from "./dtos/approved-report.dto";
import {GetEstimateDto} from "./dtos/get-estimate.dto";

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private reportRepo:Repository<Report>) {
    }
    create(reportDto:CreateReportsDto, user:User){
        const report = this.reportRepo.create(reportDto);
        report.user = user
        return this.reportRepo.save(report);
    }
    async changeApproval(id:number, approved:boolean){
        const report = await this.reportRepo.findOne({where:{id}})
        if(!report)
        {
            throw new NotFoundException("reports not found");
        }
        report.approved = approved
        return this.reportRepo.save(report)
    }
    createEstimate({make,model,year,mileage,lng,lat}:GetEstimateDto){

        return this.reportRepo
            .createQueryBuilder()
            .select('AVG(price)','price')
            .where('make= :make',{make})
            .andWhere('model= :model',{model})
            .andWhere('year -:year BETWEEN -3 AND 3',{year})
            .andWhere('lng -:lng BETWEEN -5 AND 5',{lng})
            .andWhere('lat -:lat BETWEEN -5 AND 5',{lat})
            .andWhere('approved IS TRUE')
            // .orderBy('ABS(mileage -:mileage)','DESC')
            // // @ts-ignore
            // .setParameter({mileage})
            .limit(3)
            .getRawOne();
    }
}
