﻿using Backend.Domain.Resource;
using System.Net;

namespace Backend.Domain.Exceptions
{
    public class ConflictException : Exception
    {

        #region Fields
        public int ErrorCode { get; set; } = (int)HttpStatusCode.Conflict;

        #endregion


        #region Constructors
        public ConflictException() : base(ResourceEN.Error_Conflict) { }

        public ConflictException(int errorCode)
        {
            ErrorCode = errorCode;
        }

        public ConflictException(string message) : base(message) { }

        public ConflictException(int errorCode, string message) : base(message)
        {
            ErrorCode = errorCode;
        }

        #endregion
    }
}
