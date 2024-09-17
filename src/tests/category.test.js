const {createCategory,getCategory,getCategoryById,updateCategoryById,deleteCategoryById}=require('../services/categoryService');
const client = require('../config/DataBaseConfig').client;

    jest.mock('../config/DataBaseConfig',()=>({
        client:{
            query:jest.fn(),
        },
        connect:{
            query:jest.fn(),
        }
    }));

  describe('Category Testing',()=>{
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createCategory',()=>{
        it('Should create a data', async()=>{
            const newCategory = { name: 'Test Product'}; 
            const mockDbResponse = { rows: [newCategory] };

            client.query.mockResolvedValue(mockDbResponse);
            const result= await createCategory(newCategory);

            expect(client.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
            expect(result).toEqual(newCategory);
        });
    });

    describe('getCategory',()=>{
        it('should return data from database',async ()=>{
            const mockedData={name:'Category 1'};
            const mockDbResponse={rows: [mockedData]};

            client.query.mockResolvedValue(mockDbResponse);
            const result=await getCategory();

            expect(client.query).toHaveBeenCalledWith(expect.any(String));
            expect(result).toEqual(mockedData);

        })
    })


    describe('getCategoryById',()=>{
        it('should return category by id',async ()=>{
            const mockedData={id:1,name:'Category 1'};
            const mockDbResponse={rows: [mockedData]};

            client.query.mockResolvedValue(mockDbResponse);
const result= await getCategoryById(1);

expect(client.query).toHaveBeenCalledWith(expect.any(String), [1]);
expect(result).toEqual(mockedData);

        });
    });

    describe('updateCategoryById',()=>{
        it('Should update the existing category by id',async()=>{
            const updateData={name:'Category 2'};
            const mockDbResponse={rows:[updateData]};

            client.query.mockResolvedValue(mockDbResponse);
            const result= await updateCategoryById(updateData,1);

            expect(client.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
            expect(result).toEqual(updateData);
            
        });

    });

    describe('deleteCategoryById',()=>{
        it('should delete a category by id', async ()=>{
const mockedData={name:'category 1'};
const mockDbResponse={rows:[mockedData]};

client.query.mockResolvedValue(mockDbResponse);
const result= await deleteCategoryById(1);

expect(client.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
expect(result).toEqual(mockedData);
        })
    })

  });