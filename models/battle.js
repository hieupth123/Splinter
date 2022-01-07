/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const schema = mongoose.Schema(
  {
    uuid: { type: String },
    summoner_id: { type: String },
    monster_1_id: { type: String },
    monster_2_id: { type: String },
    monster_3_id: { type: String },
    monster_4_id: { type: String },
    monster_5_id: { type: String },
    monster_6_id: { type: String },
    rule_1: { type: String },
    rule_2: { type: String },
    mana_cap: { type: Number },
    total: { type: Number },
    ratio: { type: Number },
  },
  {
    collection: 'battles',
    versionKey: false
  }
);

schema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj._id;
    return obj;
  };
  
  schema.pre('save', function (next) {
    if (this.isNew) {
      this.uuid = uuidv4();
    }
  
    next();
  });
  
export const BattleModel = mongoose.model('Battle', schema);