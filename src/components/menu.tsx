"use client";

import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuBar } from "@arthur.eudeline/starbucks-tp-kit/components/menu-bar";
import { Button } from "@arthur.eudeline/starbucks-tp-kit/components/button";
import { ShoppingBag, X } from "@phosphor-icons/react/dist/ssr";
import { Cart } from "./cart";
import { CartCounter } from "./cart-counter";


export const Menu = function () {
  return (
    <MenuBar
    trailing={
        <div className="flex flex-row items-center gap-4 justify-end">
          <Popover as="div" className="flex justify-end">
            {({ open }) => (
              <>
                <Popover.Button as={Button} variant={"ghost"} className={"!rounded-full h-[44px] w-[44px] !p-0 flex justify-center items-center aspect-square relative text-3xl"}>
                  {open 
                    ? <X size={18} weight="regular" />
                    : <ShoppingBag size={24} weight="regular" />}

                  <div className="aspect-square bg-brand text-white text-center text-xs absolute -right-1 -top-1 rounded-full flex items-center justify-center h-[20px] w-[20px]">
                    <div><CartCounter /></div>
                  </div>
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute left-0 sm:left-auto right-0 top-full z-10 mt-6 sm:w-full sm:max-w-sm">
                    <Cart />
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      }
    />
  );
};

