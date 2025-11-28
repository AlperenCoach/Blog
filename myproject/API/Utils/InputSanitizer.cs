using Ganss.Xss;

namespace API.Utils {
    public static class InputSanitizer {
        private static readonly HtmlSanitizer _sanitizer = new HtmlSanitizer();

        static InputSanitizer() {
            // Configure sanitizer to remove potentially dangerous HTML/JavaScript
            _sanitizer.AllowedTags.Clear();
            _sanitizer.AllowedAttributes.Clear();
        }

        /// <summary>
        /// Sanitizes a string input to prevent XSS attacks
        /// </summary>
        public static string Sanitize(string? input) {
            if (string.IsNullOrWhiteSpace(input)) {
                return string.Empty;
            }

            // Remove HTML tags and encode special characters
            return _sanitizer.Sanitize(input);
        }

        /// <summary>
        /// Sanitizes a string but allows basic formatting (for blog content, etc.)
        /// </summary>
        public static string SanitizeWithBasicFormatting(string? input) {
            if (string.IsNullOrWhiteSpace(input)) {
                return string.Empty;
            }

            var formatter = new HtmlSanitizer();
            // Allow basic formatting tags
            formatter.AllowedTags.Add("p");
            formatter.AllowedTags.Add("br");
            formatter.AllowedTags.Add("strong");
            formatter.AllowedTags.Add("em");
            formatter.AllowedTags.Add("u");
            formatter.AllowedTags.Add("h1");
            formatter.AllowedTags.Add("h2");
            formatter.AllowedTags.Add("h3");
            formatter.AllowedTags.Add("ul");
            formatter.AllowedTags.Add("ol");
            formatter.AllowedTags.Add("li");

            return formatter.Sanitize(input);
        }
    }
}

