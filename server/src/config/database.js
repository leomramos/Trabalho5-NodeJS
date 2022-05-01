module.exports = {
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'trabalho5PPI-Leonardo-3T',
  define: {
    timestamps: true,
    underscored: true
  }
}