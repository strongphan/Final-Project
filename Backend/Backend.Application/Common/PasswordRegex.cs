﻿using System.Text.RegularExpressions;

namespace Backend.Application.Common
{
    public class PasswordRegex
    {

        public bool IsPasswordValid(string str)
        {
            // Regex pattern to match password criteria
            string pattern = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$";

            // Check if the password matches the pattern
            return Regex.IsMatch(str, pattern);
        }
    }
}
