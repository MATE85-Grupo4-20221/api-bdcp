import { IsDefined, IsString, IsOptional, Matches, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Component } from '../../entities/Component';
import { ComponentWorkloadDto } from './ComponentWorkload';


export class CreateComponentRequestDto
implements Omit<Component, 'id' | 'userId' | 'status' | 'logs' | 'user' | 'generateLog' | 'workload' | 'createdAt' | 'updatedAt'> {

    @IsDefined()
    @IsString()
    @Matches(/^[A-Z]{3,4}[0-9]{2,4}$/)
    public code: string;

    @IsDefined()
    @IsString()
    public name: string;

    @IsDefined()
    @IsString()
    public department: string;

    @IsDefined()
    @IsString()
    public program: string;

    @IsDefined()
    @IsString()
    public semester: string;

    @IsDefined()
    @IsString()
    public prerequeriments: string;

    @IsDefined()
    @IsString()
    public methodology: string;

    @IsDefined()
    @IsString()
    public objective: string;

    @IsDefined()
    @IsString()
    public syllabus: string;

    @IsDefined()
    @IsString()
    public bibliography: string;
    
    public workloadId?: string;

    @IsOptional()
    @Type(() => ComponentWorkloadDto)
    @ValidateNested()
    public workload?: ComponentWorkloadDto;
}