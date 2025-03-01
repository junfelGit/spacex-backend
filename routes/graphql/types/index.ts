import { queries, mutations } from './resolvers';
import { User } from './declarations/user';
import { blockApp } from './declarations/blockApp';
import { Ship } from './declarations/ship';
import { Pagination } from './declarations/pagination';
import { date } from './declarations/date';
import { Mission } from './declarations/mission';
import { ShipLocation } from './declarations/ShipLocation';

export const typeDefs = [mutations, queries, date, User, Pagination, blockApp, Ship, ShipLocation, Mission];
