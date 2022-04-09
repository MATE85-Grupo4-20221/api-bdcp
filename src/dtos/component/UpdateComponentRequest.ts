import { IsString, IsOptional, Matches, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Component } from '../../entities/Component';
import { ComponentWorkloadDto } from './ComponentWorkload';

export class UpdateComponentRequestDto
implements Partial<Omit<Component, 'id' | 'userId' | 'status' | 'logs' | 'user' | 'workload' | 'generateLog' | 'createdAt' | 'updatedAt'>> {

    @IsOptional()
    @IsString()
    @Matches(/^[A-Z]{3,4}[0-9]{2,4}$/)
    public code?: string;

    @IsOptional()
    @IsString()
    public name?: string;

    @IsOptional()
    @IsString()
    public department?: string;

    @IsOptional()
    @IsString()
    public program?: string;

    @IsOptional()
    @IsString()
    public semester?: string;

    @IsOptional()
    @IsString()
    public prerequeriments?: string;

    @IsOptional()
    @IsString()
    public methodology?: string;

    @IsOptional()
    @IsString()
    public objective?: string;

    @IsOptional()
    @IsString()
    public syllabus?: string;

    @IsOptional()
    @IsString()
    public bibliography?: string;
    
    public workloadId?: string;

    @IsOptional()
    @Type(() => ComponentWorkloadDto)
    @ValidateNested()
    public workload?: ComponentWorkloadDto;
}