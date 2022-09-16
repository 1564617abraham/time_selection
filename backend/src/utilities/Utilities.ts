import { truncate } from "fs"

/**
 * Contains all the methods that are related to validate the client's inputs
 */
class Utilities {

    public static nameValidation(name: string): boolean {
        let regexName: RegExp = /^[a-z À-ÿ\u00f1\u00d1]+$/i
        let maxLength = 30
        if (name.length <= maxLength && name.match(regexName)) return true

        return false
    }

    /**
     * Capitalizes the first letter of a string
     *
     * @param string {string} String to capitalize
     * @return {string} The entered string with the first letter capitalized
     */
    public static capitalizeFirstLetter(string: string): string {
        if (/^[a-z À-ÿ\u00f1\u00d1]+$/i.test(string)) {
            return string.charAt(0).toUpperCase() + string.slice(1)
        }
        throw new Error(
            'El texto no puede contener números ni caracteres especiales'
        )
    }

    public static numberValidation(number: string): boolean {
        let regexNumber: RegExp = /^[0-9]+$/

        if (number.toString().match(regexNumber)) return true
        return false
    }
}

export default Utilities