"use client";

import React, { useState } from "react";
import { Drawer } from "../UI";
import AddOrEditAddress from "./AddOrEditAddress";


const AddNewAddress = () => {
  const [showAddressDrawer, setShowAddressDrawer] = useState<boolean>(false);
  return (
    <>
      <button className="py-3 px-4 bg-black text-white text-lg rounded-sm" onClick={() => setShowAddressDrawer(true)} >
        Add an address
      </button>
      {showAddressDrawer && (
        <Drawer title="Add New Address" onClick={() => setShowAddressDrawer(false)} >
            <AddOrEditAddress 
              isAdd
              buttonText="Add an address"
              buttonTextWhileSubmitting="Adding..." 
            />
        </Drawer>
      )}
    </>
  );
};

export default AddNewAddress;
