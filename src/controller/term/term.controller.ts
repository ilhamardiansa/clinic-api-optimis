import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { TermDto } from 'src/dto/term/term.dto';
import { TicketDto } from 'src/dto/term/ticket.dto';
import { UpdateTermDto } from 'src/dto/term/update.term.dto';
import { TermService } from 'src/service/term/term.service';

@Controller('api/terms')
export class TermController {
  constructor(private readonly termService: TermService) {}

  @Post()
  async create(@Body() termDto: TermDto, @Res() res: Response) {
    try {
      const createdTerm = await this.termService.createTerm(termDto);
      return res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        success: true,
        message: 'Term created successfully',
        data: createdTerm,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        success: false,
        message: 'Failed to create term',
        error: error.message || error,
      });
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTermDto: UpdateTermDto,
    @Res() res: Response,
  ) {
    try {
      const updatedTerm = await this.termService.updateTerm(+id, updateTermDto);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: true,
        message: 'Term updated successfully',
        data: updatedTerm,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        success: false,
        message: 'Failed to update term',
        error: error.message || error,
      });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const terms = await this.termService.findAll();
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: true,
        message: 'Terms retrieved successfully',
        data: terms,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Failed to retrieve terms',
        error: error.message || error,
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const term = await this.termService.findOne(+id);
      if (!term) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          success: false,
          message: 'Term not found',
          data: null,
        });
      }
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: true,
        message: 'Term retrieved successfully',
        data: term,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Failed to retrieve term',
        error: error.message || error,
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.termService.removeTerm(+id);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: true,
        message: 'Term deleted successfully',
        data: null,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Failed to delete term',
        error: error.message || error,
      });
    }
  }

  @Post('send-a-ticket')
  async sendTicket(@Body() ticketDto: TicketDto, @Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: true,
        message: 'Ticket sent successfully',
        data: {
          user_id: null,
          email: ticketDto.email,
          title: ticketDto.title,
          content: ticketDto.content,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        success: false,
        message: 'Failed to send ticket',
        error: error.message || error,
      });
    }
  }
}
