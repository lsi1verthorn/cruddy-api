const { Pool } = require('pg');
const {
  create,
  list,
  read,
  remove,
  update,
} = require('../db.js');

// Mock the Pool and client for testing
jest.mock('pg', () => {
  const mockClient = {
    query: jest.fn(),
    release: jest.fn(),
  };
  const mockPool = {
    connect: jest.fn(() => Promise.resolve(mockClient)),
  };
  return { Pool: jest.fn(() => mockPool) };
});

describe('CRUD operations', () => {
  let client;
  let pool;

  beforeEach(async () => {
    pool = new Pool();
    client = await pool.connect();
    client.query.mockReset();
  });

  it('should create a record', async () => {
    const table = 'test_table';
    const data = { name: 'Test Name', value: 123 };
    const expectedResult = { id: 1, ...data };

    client.query.mockResolvedValueOnce({ rows: [expectedResult] });

    const result = await create(table, data);
    expect(result).toEqual(expectedResult);
    expect(client.query).toHaveBeenCalledWith(
      'INSERT INTO test_table (name, value) VALUES ($1, $2) RETURNING *',
      ['Test Name', 123]
    );
  });

  it('should read a record', async () => {
    const table = 'test_table';
    const id = 1;
    const expectedResult = { id, name: 'Test Name', value: 123 };

    client.query.mockResolvedValueOnce({ rows: [expectedResult] });

    const result = await read(table, id);
    expect(result).toEqual(expectedResult);
    expect(client.query).toHaveBeenCalledWith('SELECT * FROM test_table WHERE id = $1', [1]);
  });

  it('should update a record', async () => {
    const table = 'test_table';
    const id = 1;
    const data = { name: 'Updated Name', value: 456 };
    const expectedResult = { id, ...data };

    client.query.mockResolvedValueOnce({ rows: [expectedResult] });

    const result = await update(table, id, data);
    expect(result).toEqual(expectedResult);
    expect(client.query).toHaveBeenCalledWith(
      'UPDATE test_table SET name = $1, value = $2 WHERE id = $3 RETURNING *',
      ['Updated Name', 456, 1]
    );
  });

  it('should remove a record', async () => {
    const table = 'test_table';
    const id = 1;
    const expectedResult = { id, name: 'Test Name', value: 123 };

    client.query.mockResolvedValueOnce({ rows: [expectedResult] });

    const result = await remove(table, id);
    expect(result).toEqual(expectedResult);
    expect(client.query).toHaveBeenCalledWith('DELETE FROM test_table WHERE id = $1 RETURNING *', [1]);
  });

  it('should list all records', async () => {
    const table = 'test_table';
    const expectedResult = [
      { id: 1, name: 'Test 1', value: 1 },
      { id: 2, name: 'Test 2', value: 2 },
    ];

    client.query.mockResolvedValueOnce({ rows: expectedResult });

    const result = await list(table);
    expect(result).toEqual(expectedResult);
    expect(client.query).toHaveBeenCalledWith('SELECT * FROM test_table ORDER BY id', []);
  });

    it('Should handle query errors', async () => {
      const table = 'test_table';
      const id = 1;
      const errorMessage = 'Database error';

      client.query.mockRejectedValueOnce(new Error(errorMessage));

      await expect(read(table, id)).rejects.toThrow(errorMessage);
  });
});
