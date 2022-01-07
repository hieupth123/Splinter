import mongoose from 'mongoose';
import fs from 'fs'
import { BattleModel } from './models/battle.js';
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'dev' });

async function getFile() {
  
    let battles = await BattleModel.find().exec()
    const dirname = process.env.PATH_DATA
    fs.readdir(dirname, async function(err, filenames) {
        if (err) {
          onError(err);
          return;
        }
        await filenames.forEach(function(filename) {
          let dataInsert = []
          fs.readFile(dirname + filename, 'utf-8', async function(err, content) {
            if (err) {
              onError(err);
              return;
            }
            let data = JSON.parse(content)
           
            data.forEach(item => {
                let obj = {
                    summoner_id: item.summoner_id,
                    monster_1_id:item.monster_1_id,
                    monster_2_id:item.monster_2_id,
                    monster_3_id:item.monster_3_id,
                    monster_4_id:item.monster_4_id,
                    monster_5_id:item.monster_5_id,
                    monster_6_id:item.monster_6_id,
                    rule1: item.ruleset,
                    mana_cap: item.mana_cap,
                    total: item.tot,
                    ratio: item.ratio
                  }
                  dataInsert.push(obj)
            });
						await BattleModel.insertMany(dataInsert).then(function(){
							console.log("Data inserted")  // Success
						}).catch(function(error){
								console.log(error)      // Failure
						});
          });
        });
      });
}

async function connectDatabase() {

    const connectionStr = process.env.DB_URI;
  
    console.log('connectionStr', connectionStr);
  
    await mongoose
      .connect(connectionStr, {
      })
      .catch(err => console.log(JSON.stringify(err.reason)));
  
    const db = mongoose.connection;
    console.log('Connecting')
    await db.on('error', err => {
      console.error('> Error occurred from the database');
      console.error(err);
    });
    db.once('open', () => {
      console.log('> Connected to database successfully');
    });
    db.on('reconnected', function () {
      console.log('Reconnected to MongoDB');
    });
}

await connectDatabase()
await getFile()