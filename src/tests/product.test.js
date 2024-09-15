const { getProduct, createProduct, getProductById, updateProductById, deleteProductById } = require('../services/productService');
    const client = require('../config/DataBaseConfig').client;
    const redisClient = require('../cache/redis');


    jest.mock('../config/DataBaseConfig', () => ({
        client: {
            query: jest.fn(),
        },
    }));

    jest.mock('../cache/redis', () => ({
        get: jest.fn(),
        setEx: jest.fn(),
    }));

    describe('Product testing', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        describe('getProduct', () => {
            it('should return data from cache', async () => {
                const mockCacheData = JSON.stringify([{ id: 1, name: 'sample product 1' }]);
                redisClient.get.mockResolvedValue(mockCacheData);

                const result = await getProduct();

                expect(redisClient.get).toHaveBeenCalled();
                expect(result).toEqual(JSON.parse(mockCacheData));
            });

            it('should return data from database', async () => {
                redisClient.get.mockResolvedValue(null);
                client.query.mockResolvedValue({ rows: [{ id: 2, name: 'sample Product 2' }] });

                const result = await getProduct();
                console.log(result);

                expect(client.query).toHaveBeenCalled();
                expect(result).toEqual([{ id: 2, name: 'sample Product 2' }]);
                expect(redisClient.setEx).toHaveBeenCalled();
            });
        });

    describe('createProduct', () => {
        it('should create a new product in the database', async () => {
            const newProduct = { name: 'Test Product', description: 'Test Description', price: 100, category_id: 1, availability_status: 'in_stock' };
            const mockDbResponse = { rows: [newProduct] };

            client.query.mockResolvedValue(mockDbResponse);

            const result = await createProduct(newProduct);
            console.log(result);

            expect(client.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
            expect(result).toEqual(newProduct);
        });
    });

    describe('getProductById', () => {
        it('should return product by id from the database', async () => {
            const mockProduct = { id: 1, name: 'Test Product' };
            client.query.mockResolvedValue({ rows: [mockProduct] });

            const result = await getProductById(1);

            expect(client.query).toHaveBeenCalledWith(expect.any(String), [1]);
            expect(result).toEqual(mockProduct);
        });
    });

    describe('updateProductById', () => {
        it('should update an existing product in the database', async () => {
            const updatedProduct = { name: 'Updated Product', description: 'Updated Description', price: 150, category_id: 2, availability_status: 'out_of_stock' };
            const mockDbResponse = { rows: [updatedProduct], rowCount: 1 };

            client.query.mockResolvedValue(mockDbResponse);

            const result = await updateProductById(updatedProduct, 1);

            expect(client.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
            expect(result).toEqual(updatedProduct);
        });
    });

    describe('deleteProductById', () => {
        it('should delete a product from the database', async () => {
            const mockDeletedProduct = { id: 1, name: 'Deleted Product' };
            client.query.mockResolvedValue({ rows: [mockDeletedProduct], rowCount: 1 });

            const result = await deleteProductById(1);

            expect(client.query).toHaveBeenCalledWith(expect.any(String), [1]);
            expect(result).toEqual(mockDeletedProduct);
        });
    });
});
