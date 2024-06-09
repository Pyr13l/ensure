# ensure

Small TypeScript util to remove the necessity for explicit null / undefined checks when working with optional / null / undefined members (like in DTOs)

Just add members to check and destruct

## what it does

Will create a copy of a supplied object and either

- check all members for null / undefined
- check the members you supplied keys for

and adjust the resulting type accordingly.

WILL THROW IF ANY CHECKED MEMBER IS NULL / UNDEFINED

## usage

```
 interface SomeDto {
    id: string | undefined;
    test?: string;
 };

 const example = async () => {
    const someDto: SomeDto = await fetch(...).then(...);

    const {id, test} = ensure(someDto, "id", "test");

    ...

    // the values of id and test are now both just string
    // no further checks needed
 }
```
