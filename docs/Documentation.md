## Problems Encountered
### Character Details modal kept popping up even when 'Add to favorites' button was clicked
- Cause: Since the 'Add to favorites' button was under the 'actions' column of the table, the `handleRowClick` function kept ignoring the button
- Solution: Upon investigating the inspect source element view, the button was specifically tagged under `.ant-btn`. Therefore, I added an if condition inside to check if the click target is not the 'Add to favorites' button

```
const handleRowClick = (record: Character, event: React.MouseEvent<HTMLElement>) => {
        // Check if the click target is not the "Add to Favorites" button
        if (event.target instanceof HTMLElement && !event.target.closest('.ant-btn')) {
            setSelectedCharacter(record);
        }
};
```

### Edge cases in filtering values 
- Cause: Eye color filtering had options such as `red, blue` and `green, yellow` which overlaps with the individual colors. This would mean that either or both of the color falls under that particular character's eye color.
- Solution: Use replace function to get rid of the whitespaces and commas so that the overlapping issue is solved. Now if the filter option `red` is chosen then all charcters with ONLY red AND `red, blue` will be displayed.

```
// Getting unique filter values and preparing filtering option for the table
const eyeColorValues = Array.from(new Set(characters.map((character) => character.eyeColor)));

const eyeColorFilter = eyeColorValues.map((color) => ({
    text: color,
    value: color.toLowerCase().replace(/\s+/g, '-') // Used to replace one or more whitespace characters (\s+) with a hyphen (-)
}));

const speciesValues = Array.from(new Set(characters.map((character) => character.species?.name).filter(Boolean)));

const speciesFilter = speciesValues.map((species) => ({
    text: species,
    value: species ? species.toLowerCase().replace(/\s+/g, '-') : ''
}));
```

### Routing error using Switch
- Cause: Switch is not an exported member of `react-router-dom`
- Solution: Instead used BrowserRouter, Route, Routes from `react-router-dom`




## Future Plans
- Replace 'Add to favorites' button with star icon to enable better user interaction
- Improve table display UI that matches the Star Wars theme
- Replace character detail preview modal with pages that include better UI for each character along with their pictures
- Improve UI of 'Favorites Only' and 'Clear Selection' button
- Add sliding transition between pages to simulate the "Force" as per the Star Wars theme 




## Learnings
### Customisable format settings
- In the settings.json, add the necessary editor settings (formatOnSave, formatOnPsater etc...) and link it to prettier-vscode
- Create a .prettierrc file and add in your desired code formatting (tabs, width, comma, bracket spacing etc...)
Credit (https://github.com/joeythelantern/React-Router-6-Example)

### Creation of interace based on the API Query
- Figured out how to extract the data from the API using GraphQL and manipulate the information

### Ant Design has it's own cursor based pagination
- In the <Table> component, `pagination` attribute can be used (https://ant.design/components/pagination)
