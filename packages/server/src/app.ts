import dotenv from 'dotenv'
dotenv.config()
import app from './server'

const PORT: String = process.env.PORT || '4000'

app.listen(PORT, () => {
  console.log(`Server runs on port: ${PORT}`)
})
