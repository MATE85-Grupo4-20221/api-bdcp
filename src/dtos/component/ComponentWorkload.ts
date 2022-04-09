import { IsOptional, IsNumber, Min } from 'class-validator';
import { ComponentWorkload } from '../../entities/ComponentWorkload';

export class ComponentWorkloadDto implements Omit<ComponentWorkload, 'id'> {
    @IsOptional()
    @IsNumber()
    @Min(0)
    public teacherTheory?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    public teacherPractice?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    public teacherTheoryPractice?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    public teacherInternship?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    public teacherPracticeInternship?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    public studentTheory?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    public studentPractice?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    public studentTheoryPractice?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    public studentInternship?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    public studentPracticeInternship?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    public moduleTheory?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    public modulePractice?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    public moduleTheoryPractice?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    public moduleInternship?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    public modulePracticeInternship?: number;
}