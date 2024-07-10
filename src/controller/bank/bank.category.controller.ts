import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Res,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { BankCategoryDto } from 'src/dto/bank/bank.category.dto';
import { UpdateBankCategoryDto } from 'src/dto/bank/update.bank.category.dto';
import { BankCategoryService } from 'src/service/bank/bank.category.service';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';

@Controller('api/bank-categories')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class BankCategoryController {
  constructor(private readonly bankCategoryService: BankCategoryService) {}

  @Post()
  @Roles('admin', 'manager', 'operator')
  async create(@Body() bankCategoryDto: BankCategoryDto, @Res() res: Response) {
    try {
      const createdBankCategory =
        await this.bankCategoryService.createBankCategory(bankCategoryDto);
      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Bank Category created successfully',
        data: createdBankCategory,
      });
    } catch (error) {
      throw new BadRequestException('Failed to create bank category', error);
    }
  }

  @Put(':id')
  @Roles('admin', 'manager', 'operator')
  async update(
    @Param('id') id: string,
    @Body() updateBankCategoryDto: UpdateBankCategoryDto,
    @Res() res: Response,
  ) {
    try {
      const updatedBankCategory =
        await this.bankCategoryService.updateBankCategory(
          id,
          updateBankCategoryDto,
        );
      if (!updatedBankCategory) {
        throw new NotFoundException('Bank Category not found');
      }
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Bank Category updated successfully',
        data: updatedBankCategory,
      });
    } catch (error) {
      throw new BadRequestException('Failed to update bank category', error);
    }
  }

  @Get()
  @Roles('admin', 'manager', 'operator')
  async findAll(@Res() res: Response) {
    try {
      const bankCategories = await this.bankCategoryService.findAll();
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Bank Categories retrieved successfully',
        data: bankCategories,
      });
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve bank categories',
        error,
      );
    }
  }

  @Get(':id')
  @Roles('admin', 'manager', 'operator')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const bankCategory = await this.bankCategoryService.findOne(id);
      if (!bankCategory) {
        throw new NotFoundException('Bank Category not found');
      }
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Bank Category retrieved successfully',
        data: bankCategory,
      });
    } catch (error) {
      throw new BadRequestException('Failed to retrieve bank category', error);
    }
  }

  @Delete(':id')
  @Roles('admin', 'manager', 'operator')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const isDeleted = await this.bankCategoryService.removeBankCategory(id);
      if (!isDeleted) {
        throw new NotFoundException('Bank Category not found');
      }
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Bank Category deleted successfully',
      });
    } catch (error) {
      throw new BadRequestException('Failed to delete bank category', error);
    }
  }
}
