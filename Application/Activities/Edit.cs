using Domain;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Edit
{
    public class Command : IRequest
    {
        public Activity Activity { get; set; }
    }

    public class Hander : IRequestHandler<Command>
    {
        private readonly DataContext _context;

        public Hander(DataContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(request.Activity.Id);

            activity.Title = request.Activity.Title ?? activity.Title;

            await _context.SaveChangesAsync();

            return Unit.Value;
        }
    }
}