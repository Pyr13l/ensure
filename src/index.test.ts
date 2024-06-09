import { test, describe, expect } from "@jest/globals";
import { ensure, isDefined } from "./index";

describe("Tests for isDefined", () => {
  test("isDefined works", () => {
    expect(isDefined("test")).toBe(true);
  });

  test("isDefined is false for undefined", () => {
    expect(isDefined(undefined)).toBe(false);
  });

  test("isDefined is false for null", () => {
    expect(isDefined(null)).toBe(false);
  });
});

const VALUE_WAS_NOT_DEFINED_ERROR_MSG_RGX = /^Supplied value was not defined!$/;
const MEMBER_WAS_NOT_DEFINED_ERROR_MSG_RGX = /^Member was not defined: test$/;

describe("Tests for ensure", () => {
  test("ensure throws if supplied value is undefined", () => {
    expect(() => ensure(undefined)).toThrow(
      VALUE_WAS_NOT_DEFINED_ERROR_MSG_RGX
    );
  });

  test("ensure works without args", () => {
    const value = { fizz: "BUZZ", blub: () => {} };
    expect(ensure(value)).toBeDefined();
  });

  test("ensure without args throws on undefined member", () => {
    const value = { fizz: "BUZZ", test: undefined, blub: () => {} };
    expect(() => ensure(value)).toThrow(MEMBER_WAS_NOT_DEFINED_ERROR_MSG_RGX);
  });

  test("ensure works with args", () => {
    const value = { fizz: "BUZZ", test: undefined, blub: () => {} };
    expect(ensure(value, "fizz")).toBeDefined();
  });

  test("ensure throws if member in args is undefined", () => {
    const value = { test: undefined, fizz: "BUZZ", blub: () => {} };
    expect(() => ensure(value, "test")).toThrow(
      MEMBER_WAS_NOT_DEFINED_ERROR_MSG_RGX
    );
  });

  test("ensure throws if member in args is null", () => {
    const value = { test: null, fizz: "BUZZ", blub: () => {} };
    expect(() => ensure(value, "test")).toThrow(
      MEMBER_WAS_NOT_DEFINED_ERROR_MSG_RGX
    );
  });
});
