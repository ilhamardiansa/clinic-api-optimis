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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { BankCategoryDto } from 'src/dto/bank/bank.category.dto';
import { UpdateBankCategoryDto } from 'src/dto/bank/update.bank.category.dto';
import { format_json } from 'src/env';
import { BankCategoryService } from 'src/service/bank/bank.category.service';

@Controller('api/bank-categories')
export class BankCategoryController {
  constructor(private readonly bankCategoryService: BankCategoryService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() bankCategoryDto: BankCategoryDto, @Res() res: Response) {
    try {
      const createdBankCategory =
        await this.bankCategoryService.createBankCategory(bankCategoryDto);
      return res
        .status(201)
        .json(
          format_json(
            201,
            true,
            null,
            null,
            'Bank Category created successfully',
            createdBankCategory,
          ),
        );
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(
            400,
            false,
            'Bad Request',
            null,
            'Failed to create bank category',
            error,
          ),
        );
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() updateBankCategoryDto: UpdateBankCategoryDto,
    @Res() res: Response,
  ) {
    try {
      const updatedBankCategory =
        await this.bankCategoryService.updateBankCategory(
          +id,
          updateBankCategoryDto,
        );
      if (!updatedBankCategory) {
        return res
          .status(404)
          .json(
            format_json(
              404,
              false,
              'Not Found',
              null,
              'Bank Category not found',
              null,
            ),
          );
      }
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Bank Category updated successfully',
            updatedBankCategory,
          ),
        );
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(
            400,
            false,
            'Bad Request',
            null,
            'Failed to update bank category',
            error,
          ),
        );
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Res() res: Response) {
    try {
      const bankCategories = await this.bankCategoryService.findAll();
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Bank Categories retrieved successfully',
            bankCategories,
          ),
        );
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(
            400,
            false,
            'Bad Request',
            null,
            'Failed to retrieve bank categories',
            error,
          ),
        );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const bankCategory = await this.bankCategoryService.findOne(+id);
      if (!bankCategory) {
        return res
          .status(404)
          .json(
            format_json(
              404,
              false,
              'Not Found',
              null,
              'Bank Category not found',
              null,
            ),
          );
      }
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Bank Category retrieved successfully',
            bankCategory,
          ),
        );
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(
            400,
            false,
            'Bad Request',
            null,
            'Failed to retrieve bank category',
            error,
          ),
        );
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const isDeleted = await this.bankCategoryService.removeBankCategory(+id);
      if (!isDeleted) {
        return res
          .status(404)
          .json(
            format_json(
              404,
              false,
              'Not Found',
              null,
              'Bank Category not found',
              null,
            ),
          );
      }
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Bank Category deleted successfully',
            null,
          ),
        );
    } catch (error) {
      return res
        .status(500)
        .json(
          format_json(
            500,
            false,
            'Internal Server Error',
            null,
            'Failed to delete bank category',
            error.message || error,
          ),
        );
    }
  }
}
