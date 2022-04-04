type PaginateParams = { page: number; limit: number }

export const paginate = (data: unknown[], { page, limit }: PaginateParams) => {
    const results = data.slice(limit * page, limit * (page + 1));
    const total = data.length;

    return { results, total };
};
