import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  dataTransform = ({ dataFieldName, data }) => {
    let pageInfo: {
      docs?: [] | null;
    } = {};

    if (data.docs) {
      pageInfo = Object.assign({}, data);
      delete pageInfo.docs;
    } else {
      data.docs = data;
      pageInfo = {};
    }

    const transformedData = [
      {
        [dataFieldName]: data.docs || [],
        pageInfo,
      },
    ];

    return transformedData;
  };
}
