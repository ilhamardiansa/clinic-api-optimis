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
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { TermDto } from 'src/dto/term/term.dto';
import { TicketDto } from 'src/dto/term/ticket.dto';
import { UpdateTermDto } from 'src/dto/term/update.term.dto';
import { format_json } from 'src/env';
import { TermService } from 'src/service/term/term.service';
import { Roles } from 'src/middleware/role.decorator';
import { RolesGuard } from 'src/middleware/role.guard';

@Controller('api/terms')
@UseGuards(RolesGuard)
export class TermController {
  constructor(private readonly termService: TermService) {}

  @Get('tickets')
  @Roles('admin', 'manager', 'operator')
  async findAllTickets(@Res() res: Response) {
    try {
      const tickets = await this.termService.findAllTickets();
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Tickets retrieved successfully',
            tickets,
          ),
        );
    } catch (error) {
      return res
        .status(500)
        .json(
          format_json(
            500,
            false,
            null,
            error || error,
            'Failed to retrieve tickets',
            null,
          ),
        );
    }
  }

  @Post()
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
  async create(@Body() termDto: TermDto, @Res() res: Response) {
    try {
      const createdTerm = await this.termService.createTerm(termDto);
      return res
        .status(201)
        .json(
          format_json(
            201,
            true,
            null,
            null,
            'Term created successfully',
            createdTerm,
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
            'Failed to create term',
            error || error,
          ),
        );
    }
  }

  @Put(':id')
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
  async update(
    @Param('id') id: string,
    @Body() updateTermDto: UpdateTermDto,
    @Res() res: Response,
  ) {
    try {
      const updatedTerm = await this.termService.updateTerm(+id, updateTermDto);
      if (!updatedTerm) {
        return res
          .status(404)
          .json(
            format_json(404, false, 'Not Found', null, 'Term not found', null),
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
            'Term updated successfully',
            updatedTerm,
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
            'Failed to update term',
            error || error,
          ),
        );
    }
  }

  @Get()
  @Roles('admin', 'manager', 'operator')
  async findAll(@Res() res: Response) {
    try {
      const terms = await this.termService.findAll();
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Terms retrieved successfully',
            terms,
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
            'Failed to retrieve terms',
            error || error,
          ),
        );
    }
  }

  @Get(':id')
  @Roles('admin', 'manager', 'operator')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const term = await this.termService.findOne(+id);
      if (!term) {
        return res
          .status(404)
          .json(
            format_json(404, false, 'Not Found', null, 'Term not found', null),
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
            'Term retrieved successfully',
            term,
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
            'Failed to retrieve term',
            error || error,
          ),
        );
    }
  }

  @Delete(':id')
  @Roles('admin', 'manager', 'operator')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const term = await this.termService.findOne(+id);
      if (!term) {
        return res
          .status(404)
          .json(
            format_json(404, false, 'Not Found', null, 'Term not found', null),
          );
      }
      await this.termService.removeTerm(+id);
      return res
        .status(200)
        .json(
          format_json(200, true, null, null, 'Term deleted successfully', null),
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
            'Failed to delete term',
            error || error,
          ),
        );
    }
  }

  @Post('send-a-ticket')
  @UsePipes(CustomValidationPipe)
  @Roles('admin')
  async sendTicket(@Body() ticketDto: TicketDto, @Res() res: Response) {
    try {
      const userId = null;
      const ticket = await this.termService.sendTicket(ticketDto, userId);
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Ticket sent successfully',
            ticket,
          ),
        );
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(
            400,
            false,
            null,
            error || error,
            'Failed to send ticket',
            null,
          ),
        );
    }
  }
}
