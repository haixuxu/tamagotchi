#![no_std]

use codec::{Decode, Encode};
use gmeta::{In, InOut, Metadata, Out};
use gstd::{prelude::*, ActorId};
pub type AttributeId = u32;
pub type TransactionId = u64;
pub struct ProgramMetadata;


impl Metadata for ProgramMetadata {
    type Init = In<TmgInit>;
    type Handle = InOut<TmgAction, TmgReply>;
    type Reply = ();
    type Others = ();
    type Signal = ();
    type State = Out<Tamagotchi>;
}

#[derive(Encode, Decode, TypeInfo, Debug)]
pub enum TmgAction {
    Name,
    Age,
    Feed,
    Play,
    Sleep,
    TmgInfo,
}

#[derive(Encode, Debug, PartialEq, Eq, Decode, TypeInfo)]
pub enum TmgReply {
    Name(String),
    Age(u64),
    Fed,
    Entertained,
    Slept,
    TmgInfo {
        owner: ActorId,
        name: String,
        date_of_birth: u64,
    },
}
#[derive(Debug, Clone, Encode, Decode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct TmgInit {
    pub name: String,
}

#[derive(Default, Encode, Decode, TypeInfo)]
pub struct Tamagotchi {
    pub name: String,
    pub date_of_birth: u64,
    pub owner: ActorId,
    pub fed: u64,
    pub fed_block: u64,
    pub entertained: u64,
    pub entertained_block: u64,
    pub rested: u64,
    pub rested_block: u64,
    pub allowed_account: Option<ActorId>,
}
