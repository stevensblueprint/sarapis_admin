import FileImport from './FileImport';
import LinkType from './LinkType';
import Organization from './Organization';
import { Service } from './Service';
import Taxonomy from './Taxonomy';
import TaxonomyTerm from './TaxonomyTerm';

interface ActionLog {
  id: string;
  timestamp: string;
  type: string;
  success: boolean;
  error_message: string | null;
  format: string;
  size: number | null;
  user_id: string;
  file_imports: FileImport[];
}

interface ActionExchange {
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  size: number;
  firstPage: string;
  lastPage: string;
  empty: boolean;
  contents: ActionLog[];
}

interface OrganizationExchange {
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  size: number;
  firstPage: string;
  lastPage: string;
  empty: boolean;
  contents: Organization[];
}

interface ServiceExchange {
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  size: number;
  firstPage: string;
  lastPage: string;
  empty: boolean;
  contents: Service[];
}

interface TaxonomyExchange {
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  size: number;
  firstPage: string;
  lastPage: string;
  empty: boolean;
  contents: Taxonomy[];
}

interface TaxonomyTermExchange {
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  size: number;
  firstPage: string;
  lastPage: string;
  empty: boolean;
  contents: TaxonomyTerm[];
}

interface LinkTypeExchange {
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  size: number;
  firstPage: string;
  lastPage: string;
  empty: boolean;
  contents: LinkType[];
}

export type {
  ActionLog,
  ActionExchange,
  OrganizationExchange,
  ServiceExchange,
  TaxonomyExchange,
  TaxonomyTermExchange,
  LinkTypeExchange,
};
